package com.lpfa.LPFA._Data.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping( path = "/lpfadata/api")
public class PlayerController {
    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    //? Endpoint for the SearchBar
    @GetMapping("/getPlayerByNameAndTeam")
    public Optional<Player> getPlayerByName(@RequestParam String name, @RequestParam String team) {
        return playerService.getPlayerByNameAndTeam(name, team);
    }

    //? Endpoint for filtered search
    @GetMapping("/getPlayersByFilters")
    public List<Player> getPlayersByFilters(
            @RequestParam(required = false) List<String> teams,
            @RequestParam(required = false) String position,
            @RequestParam(required = false) Integer minAge,
            @RequestParam(required = false) Integer maxAge,
            @RequestParam(required = false) Integer minGoals,
            @RequestParam(required = false) Integer maxGoals,
            @RequestParam(required = false) Integer minAssists,
            @RequestParam(required = false) Integer maxAssists
    ) {
        return playerService.getPlayersByFilters(teams, position, minAge, maxAge, minGoals, maxGoals, minAssists, maxAssists);
    }

    @GetMapping("/getAllTeams")
    public List<String> getAllTeams() {
        return playerService.getAllTeams();
    }
}