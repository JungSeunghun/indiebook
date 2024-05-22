package com.example.usermanagementserver.signup.dto

data class UserRegistrationResponse(
    val userKeyId: String,
    val userId: String,
    val email: String,
    val userName: String
)
