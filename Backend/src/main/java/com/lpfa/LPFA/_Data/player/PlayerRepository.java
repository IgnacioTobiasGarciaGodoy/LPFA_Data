package com.lpfa.LPFA._Data.player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    @Query("SELECT DISTINCT p.team FROM Player p WHERE p.team IS NOT NULL ORDER BY p.team ASC")
    List<String> findDistinctTeams();

    @Query("SELECT p FROM Player p WHERE p.name = :name AND p.team = :team")
    Optional<Player> findByNameAndTeam(String name, String team);
}