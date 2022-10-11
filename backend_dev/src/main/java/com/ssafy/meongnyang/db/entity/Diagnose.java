package com.ssafy.meongnyang.db.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Diagnose {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "diagnose_id")
    private Long id;

//    @Column(nullable = false)
//    private Integer species;

    @Column(nullable = false)
    private String name;

//    @Column(nullable = false)
//    private Integer type;

//    @Column(nullable = false)
//    private String code;

    @Column(nullable = false)
    private String disease_name1;

    @Column(nullable = false)
    private String probability1;

    @Column(nullable = false)
    private String disease_name2;

    @Column(nullable = false)
    private String probability2;

    @Column(nullable = false)
    private String disease_name3;

    @Column(nullable = false)
    private String probability3;

    @CreationTimestamp
    @Column(nullable = false, updatable = false, columnDefinition="TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP")
    private Timestamp date;

    @Column(nullable = false)
    private String img_url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
