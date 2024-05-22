package com.example.usermanagementserver.signup.repository

import com.example.usermanagementserver.signup.model.UserProfile
import org.springframework.data.repository.kotlin.CoroutineCrudRepository

interface UserProfileRepository : CoroutineCrudRepository<UserProfile, String>