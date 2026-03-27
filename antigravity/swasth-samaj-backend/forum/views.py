from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Question, Answer
from .serializers import QuestionSerializer, AnswerSerializer

class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all().order_by('-created_at')
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'])
    def upvote(self, request, pk=None):
        question = self.get_object()
        question.upvotes += 1
        question.save()
        return Response({'status': 'upvoted', 'upvotes': question.upvotes})

class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all().order_by('-upvotes', '-created_at')
    serializer_class = AnswerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'])
    def upvote(self, request, pk=None):
        answer = self.get_object()
        answer.upvotes += 1
        answer.save()
        return Response({'status': 'upvoted', 'upvotes': answer.upvotes})
