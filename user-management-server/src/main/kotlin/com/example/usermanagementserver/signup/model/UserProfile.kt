package com.example.usermanagementserver.signup.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDate
import java.time.LocalDateTime

@Table("user_profile")
data class UserProfile(
    @Id
    val userKeyId: String,
    val email: String,
    val userName: String,
    val birth: LocalDate?,
    val gender: String,
    val phoneNumber: String?,
    val address: String?,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now()
)