package com.lpfa.LPFA._Data.player;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "player_stats")
@Data
public class Player {

    /** Player's ID */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Player's name */
    private String name;

    /** Player's nationality (country code and country name) */
    private String nation;

    /** Position on the field (e.g., FW, MF, DF) */
    private String pos;

    /** Player's age */
    private Float age;

    /** Matches played */
    private Float mp;

    /** Matches started as part of the starting lineup */
    private Integer starts;

    /** Minutes played */
    private Float min;

    /** Matches equivalent to 90 minutes played */
    private Float nineties;

    /** Goals scored */
    private Float gls;

    /** Assists made */
    private Float ast;

    /** Goals + Assists (sum) */
    private Float g_a;

    /** Goals excluding penalties */
    private Float g_pk;

    /** Penalty goals scored */
    private Float pk;

    /** Penalty attempts */
    private Float pkatt;

    /** Yellow cards received */
    private Float crdy;

    /** Red cards received */
    private Float crdr;

    /** Expected goals (xG) */
    private Float xg;

    /** Expected goals excluding penalties */
    private Float npxg;

    /** Expected assists (xA) */
    private Float xag;

    /** Expected goals + assists excluding penalties */
    private Float npxg_xag;

    /** Progressive passes completed */
    private Float prgc;

    /** Progressive passes attempted */
    private Float prgp;

    /** Progressive runs with the ball */
    private Float prgr;

    /** Goals per 90 minutes played */
    private Float gls_per_90;

    /** Assists per 90 minutes played */
    private Float ast_per_90;

    /** Goals + Assists per 90 minutes played */
    private Float g_a_per_90;

    /** Goals excluding penalties per 90 minutes played */
    private Float g_pk_per_90;

    /** Goals + Assists excluding penalties per 90 minutes played */
    private Float g_a_pk_per_90;

    /** Expected goals per 90 minutes played */
    private Float xg_per_90;

    /** Expected assists per 90 minutes played */
    private Float xag_per_90;

    /** Expected goals + assists per 90 minutes played */
    private Float xg_xag_per_90;

    /** Expected goals excluding penalties per 90 minutes played */
    private Float npxg_per_90;

    /** Expected goals + assists excluding penalties per 90 minutes played */
    private Float npxg_xag_per_90;

    /** Player's team */
    private String team;

    public Player() {
    }

    public Player(String name, String nation, String pos, Float age, Float mp, Integer starts, Float min, Float nineties, Float gls, Float ast, Float g_a, Float g_pk, Float pk, Float pkatt, Float crdy, Float crdr, Float xg, Float npxg, Float xag, Float npxg_xag, Float prgc, Float prgp, Float prgr, Float gls_per_90, Float ast_per_90, Float g_a_per_90, Float g_pk_per_90, Float g_a_pk_per_90, Float xg_per_90, Float xag_per_90, Float xg_xag_per_90, Float npxg_per_90, Float npxg_xag_per_90, String team) {
        this.name = name;
        this.nation = nation;
        this.pos = pos;
        this.age = age;
        this.mp = mp;
        this.starts = starts;
        this.min = min;
        this.nineties = nineties;
        this.gls = gls;
        this.ast = ast;
        this.g_a = g_a;
        this.g_pk = g_pk;
        this.pk = pk;
        this.pkatt = pkatt;
        this.crdy = crdy;
        this.crdr = crdr;
        this.xg = xg;
        this.npxg = npxg;
        this.xag = xag;
        this.npxg_xag = npxg_xag;
        this.prgc = prgc;
        this.prgp = prgp;
        this.prgr = prgr;
        this.gls_per_90 = gls_per_90;
        this.ast_per_90 = ast_per_90;
        this.g_a_per_90 = g_a_per_90;
        this.g_pk_per_90 = g_pk_per_90;
        this.g_a_pk_per_90 = g_a_pk_per_90;
        this.xg_per_90 = xg_per_90;
        this.xag_per_90 = xag_per_90;
        this.xg_xag_per_90 = xg_xag_per_90;
        this.npxg_per_90 = npxg_per_90;
        this.npxg_xag_per_90 = npxg_xag_per_90;
        this.team = team;
    }

}
