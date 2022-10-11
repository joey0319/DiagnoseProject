package com.ssafy.meongnyang.db.entity;

import com.ssafy.meongnyang.api.request.ShowPetUpdateDto;
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
public class ShowPet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "show_pet_id")
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String content;

    @CreationTimestamp
    @Column(nullable = false, updatable = false, columnDefinition="TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP")
    private Timestamp date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "showpet", cascade = CascadeType.ALL)
    private List<ShowPetImg> showPetImgList = new ArrayList<>();

    @OneToMany(mappedBy = "showpet", cascade = CascadeType.ALL)
    private List<Comment> commentList = new ArrayList<>();

    public void updateShowPet(ShowPetUpdateDto showPetUpdateDto) {
        this.title = showPetUpdateDto.getTitle();
        this.name = showPetUpdateDto.getName();
        this.content = showPetUpdateDto.getContent();
    }
}
