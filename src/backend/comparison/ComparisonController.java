package com.arian.vizpotifybackend.comparison;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/comparison")
@RequiredArgsConstructor
public class ComparisonController {

    private final ComparisonService comparisonService;

    @GetMapping("/{userId1}/{userId2}")
    public ResponseEntity<ComparisonDto> compareUsers(
            @PathVariable String userId1,
            @PathVariable String userId2) {
        ComparisonDto comparisonDto = comparisonService.compareUsers(userId1, userId2);
        return ResponseEntity.ok(comparisonDto);
    }

}
