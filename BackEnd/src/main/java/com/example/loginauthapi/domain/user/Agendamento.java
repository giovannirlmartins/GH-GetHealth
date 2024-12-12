package com.example.loginauthapi.domain.user;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Table(name = "agendamentos")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Agendamento {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nomeCliente;

    @Column(nullable = false)
    private String nomeProfissional;

    @Column(nullable = false)
    private LocalDateTime dataAgendamento;

    @Column(nullable = false)
    private String tipoServico;

    @Enumerated(EnumType.STRING)
    private StatusAgendamento status;

    @Column(length = 500)
    private String observacoes;

    @ManyToOne
    @JoinColumn(name = "profissional_id", nullable = false)
    private Profissional profissional;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private User user;

    @Column(nullable = false, updatable = false)
    private LocalDateTime criadoEm;

    @Column(nullable = false)
    private LocalDateTime atualizadoEm;

    @PrePersist
    protected void onCreate() {
        criadoEm = LocalDateTime.now();
        atualizadoEm = criadoEm;

    }

    @PreUpdate
    protected void onUpdate() {
        atualizadoEm = LocalDateTime.now();

    }






}
