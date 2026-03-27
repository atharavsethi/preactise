from rest_framework import serializers
from .models import Question, Answer
from users.serializers import UserSerializer

class AnswerSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = Answer
        fields = '__all__'
        read_only_fields = ('author', 'upvotes', 'is_verified')

class QuestionSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    answers = AnswerSerializer(many=True, read_only=True)
    
    class Meta:
        model = Question
        fields = '__all__'
        read_only_fields = ('author', 'upvotes')
