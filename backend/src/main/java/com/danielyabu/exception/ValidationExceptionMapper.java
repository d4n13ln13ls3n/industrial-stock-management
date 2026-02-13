package com.danielyabu.exception;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Provider
public class ValidationExceptionMapper implements ExceptionMapper<ConstraintViolationException> {
    @Override
    public Response toResponse(ConstraintViolationException exception) {
        
        Set<ConstraintViolation<?>> violations = exception.getConstraintViolations();

        List<Map<String, String>> errors = new ArrayList<>();

        for (ConstraintViolation<?> violation : violations) {

            Map<String, String> error = new HashMap<>();
            error.put("field", violation.getPropertyPath().toString());
            error.put("message", violation.getMessage());

            errors.add(error);
        }

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("errors", errors);

        return Response.status(Response.Status.BAD_REQUEST)
            .entity(responseBody)
            .build();
    }
}
