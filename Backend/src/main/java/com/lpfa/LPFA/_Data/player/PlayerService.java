package com.lpfa.LPFA._Data.player;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;

@Component
public class PlayerService {

    private final PlayerRepository playerRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public Optional<Player> getPlayerByNameAndTeam(String name, String team) {
        return playerRepository.findByNameAndTeam(name, team);
    }

    public List<Player> getPlayersByFilters(List<String> teams, String position,
                                            Integer minAge, Integer maxAge,
                                            Integer minGoals, Integer maxGoals,
                                            Integer minAssists, Integer maxAssists) {

        StringBuilder queryBuilder = new StringBuilder("SELECT * FROM player_stats WHERE 1=1");

        if (teams != null && !teams.isEmpty()) {
            queryBuilder.append(" AND team IN (:teams)");
        }
        if (position != null && !position.isEmpty()) {
            queryBuilder.append(" AND pos = :position");
        }
        if (minAge != null) {
            queryBuilder.append(" AND age >= :minAge");
        }
        if (maxAge != null) {
            queryBuilder.append(" AND age <= :maxAge");
        }
        if (minGoals != null) {
            queryBuilder.append(" AND gls >= :minGoals");
        }
        if (maxGoals != null) {
            queryBuilder.append(" AND gls <= :maxGoals");
        }
        if (minAssists != null) {
            queryBuilder.append(" AND ast >= :minAssists");
        }
        if (maxAssists != null) {
            queryBuilder.append(" AND ast <= :maxAssists");
        }

        Query query = entityManager.createNativeQuery(queryBuilder.toString(), Player.class);

        if (teams != null && !teams.isEmpty()) {
            query.setParameter("teams", teams);
        }
        if (position != null && !position.isEmpty()) {
            query.setParameter("position", position);
        }
        if (minAge != null) {
            query.setParameter("minAge", minAge);
        }
        if (maxAge != null) {
            query.setParameter("maxAge", maxAge);
        }
        if (minGoals != null) {
            query.setParameter("minGoals", minGoals);
        }
        if (maxGoals != null) {
            query.setParameter("maxGoals", maxGoals);
        }
        if (minAssists != null) {
            query.setParameter("minAssists", minAssists);
        }
        if (maxAssists != null) {
            query.setParameter("maxAssists", maxAssists);
        }

        return query.getResultList();
    }

    public List<String> getAllTeams() {
        return playerRepository.findDistinctTeams();
    }
}

