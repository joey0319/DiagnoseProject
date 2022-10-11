package com.ssafy.meongnyang.db.entity;

import com.ssafy.meongnyang.api.request.IsFoundUpdateDto;
import com.ssafy.meongnyang.api.request.LostUpdateDto;
import com.sun.org.apache.xpath.internal.operations.Bool;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Lost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lost_id")
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer gender;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private Boolean is_found;

    @Column(nullable = false)
    private String name;

    @CreationTimestamp
    @Column(nullable = false, updatable = false, columnDefinition="TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP")
    private Timestamp date;

    @Column
    private String lost_date;

    @Column
    private String age;

    @Column
    private String weight;

    @Column
    private String kind;

    @Column
    private String place;

    @Column
    private String pay;

    @Column
    private String etc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "lost", cascade = CascadeType.ALL)
    private List<LostImg> lostImgList = new ArrayList<>();

    public void updateLost(LostUpdateDto lostUpdateDto) {
        this.title = lostUpdateDto.getTitle();
        this.gender = lostUpdateDto.getGender();
        this.lost_date = lostUpdateDto.getLost_date();
        this.age = lostUpdateDto.getAge();
        this.weight = lostUpdateDto.getWeight();
        this.kind = lostUpdateDto.getKind();
        this.place = lostUpdateDto.getPlace();
        this.phone = lostUpdateDto.getPhone();
        this.pay = lostUpdateDto.getPay();
        this.etc = lostUpdateDto.getEtc();
        this.is_found = lostUpdateDto.getIs_found();
        this.name = lostUpdateDto.getName();
    }

    public void updateIsFound(Boolean is_found) {
        this.is_found = is_found;
    }
}
