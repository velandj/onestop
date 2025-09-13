from django.contrib.auth.hashers import make_password, check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import user_cred
from django.db import IntegrityError

@api_view(['POST'])
def login(request, format=None):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        user_get = user_cred.objects.get(username=username)
    except user_cred.DoesNotExist:
        return Response({'message': 'user does not exist'}, status=404)

    if check_password(password, user_get.password):
        return Response({'message': 'successfully logined'}, status=200)
    else:
        return Response({'message': 'wrong password'}, status=401)


@api_view(['POST'])
def create_user(request, format=None):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'message': 'username and password required'}, status=400)

    try:
        enc_pass = make_password(password)
        obj = user_cred(username=username, password=enc_pass)
        obj.save()
    except IntegrityError:
        return Response({'message': 'username already exists'}, status=400)

    return Response({'message': 'user created'}, status=201)
