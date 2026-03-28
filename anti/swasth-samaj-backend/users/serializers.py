from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'role', 'specialty', 'verification_status', 'medical_license', 'reputation_score', 'cme_credits')
        read_only_fields = ('reputation_score', 'cme_credits', 'verification_status')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('email', 'password', 'name', 'role', 'specialty', 'medical_license')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'], # Username required by AbstractUser but we use email
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data.get('name', ''),
            role=validated_data.get('role', 'USER'),
            specialty=validated_data.get('specialty', ''),
            medical_license=validated_data.get('medical_license', '')
        )
        return user
