package com.example.usermanagementserver.signup.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDateTime


@Table("user_key")
data class UserKey(
    @Id
    val userKeyId: String,
    val userId: String,
    val createdAt: LocalDateTime = LocalDateTime.now()
)