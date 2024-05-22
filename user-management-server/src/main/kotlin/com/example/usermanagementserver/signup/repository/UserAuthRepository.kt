package com.example.usermanagementserver.signup.repository

import com.example.usermanagementserver.signup.model.UserAuth
import org.springframework.data.repository.kotlin.CoroutineCrudRepository

interface UserAuthRepository : CoroutineCrudRepository<UserAuth, String>