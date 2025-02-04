package com.univate.univate01.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import com.univate.univate01.model.User;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.security.Key;

import javax.crypto.SecretKey;

@Component
public class JwtHelper {

    // @Value("${jwt.secret}")
    private String secretKey ;

    private final long EXPIRATION_TIME = 86400000; // 1 day

    public JwtHelper() {
        // Securely generate a key using jjwt
        byte[] keyBytes = new byte[64];
        Key key = Keys.hmacShaKeyFor(keyBytes);
        this.secretKey = Base64.getEncoder().encodeToString(key.getEncoded());
    }
    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    @SuppressWarnings("deprecation")
    public String generateToken(User existingUser) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", existingUser.getRoles()); // Store user role in claims

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(existingUser.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(token).getPayload().getSubject();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        final Date expiration = Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(token).getPayload().getExpiration();
        return expiration.before(new Date());
    }
}
