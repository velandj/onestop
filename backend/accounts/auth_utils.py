import jwt
from django.conf import settings
from accounts.models import user_cred

def get_user_from_token(request):
    auth = request.META.get("HTTP_AUTHORIZATION", "")
    if not auth:
        return None
    parts = auth.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        return None
    token = parts[1]
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        username = payload.get("username")
        if not username:
            return None
        try:
            return user_cred.objects.get(username=username)
        except user_cred.DoesNotExist:
            return None
    except jwt.ExpiredSignatureError:
        return None
    except Exception:
        return None
