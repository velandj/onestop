from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import QuizQuestion, QuizResult, College
from .serializers import QuizQuestionSerializer, QuizResultSerializer, CollegeSerializer
from accounts.auth_utils import get_user_from_token

# Public: Quiz Home content
@api_view(['GET'])
def quiz_home(request):
    data = {
        "title": "Career Guidance Quiz",
        "subtitle": "Discover your interests and aptitudes to make informed decisions about your academic future.",
        "guidelines": [
            "Answer honestly based on your interests",
            "No right or wrong answers",
            "Scale of 1-5 for each question",
            "Review answers before submitting",
        ],
        "features": [
            {"title": "Discover Your Strengths", "desc": "Identify your abilities across Engineering, Medical, Arts, Commerce, and Technology"},
            {"title": "Personalized Recommendations", "desc": "Get tailored course suggestions and career paths"},
            {"title": "Informed Decisions", "desc": "Make confident academic choices with data-driven insights"},
        ]
    }
    return Response(data)

# Public: list quiz questions
@api_view(['GET'])
def quiz_questions(request):
    qs = QuizQuestion.objects.all()
    serializer = QuizQuestionSerializer(qs, many=True)
    return Response(serializer.data)

# Authenticated: submit quiz
@api_view(['POST'])
def submit_quiz(request):
    user = get_user_from_token(request)
    if not user:
        return Response({'detail': 'Authentication required'}, status=401)

    data = request.data
    answers = data.get("answers", [])
    
    # Build score totals:
    totals = {"engineering":0,"medical":0,"arts":0,"commerce":0,"technology":0}
    for a in answers:
        cat = a.get("category")
        val = a.get("answer", 0)
        if cat in totals:
            totals[cat] += int(val)

    # Recommendation
    sorted_streams = sorted(totals.items(), key=lambda x: x[1], reverse=True)
    recommended = {
        "top": sorted_streams[0][0],
        "ranked": [{"stream": s, "score": sc} for s, sc in sorted_streams]
    }

    # Save result
    result = QuizResult.objects.create(
        user=user,
        scores=totals,
        answers=answers,
        recommended=recommended
    )
    serializer = QuizResultSerializer(result)
    return Response(serializer.data, status=201)

# Authenticated: list results
@api_view(['GET'])
def my_results(request):
    user = get_user_from_token(request)
    if not user:
        return Response({'detail': 'Authentication required'}, status=401)
    qs = QuizResult.objects.filter(user=user).order_by('-created_at')
    serializer = QuizResultSerializer(qs, many=True)
    return Response(serializer.data)

# Public: colleges
@api_view(['GET'])
def colleges_list(request):
    qs = College.objects.all()
    serializer = CollegeSerializer(qs, many=True)
    return Response(serializer.data)
