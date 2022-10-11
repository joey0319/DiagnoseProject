package com.ssafy.meongnyang.db.repository;

import com.ssafy.meongnyang.db.entity.LostImg;
import com.ssafy.meongnyang.db.entity.ShowPetImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowPetImgRepository extends JpaRepository<ShowPetImg, Long> {
    @Modifying
    @Query("delete from ShowPetImg s where s.showpet.id =:id")
    void deleteAllByShowPetId(Long id);

    @Query("select s from ShowPetImg s where s.showpet.id =:id")
    List<ShowPetImg> selectAllByShowPetId(Long id);
}
