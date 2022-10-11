package com.ssafy.meongnyang.db.repository;

import com.ssafy.meongnyang.db.entity.LostImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LostImgRepository extends JpaRepository<LostImg, Long> {
    @Modifying
    @Query("delete from LostImg l where l.lost.id =:id")
    void deleteAllByLostId(Long id);

    @Query("select l from LostImg l where l.lost.id =:id")
    List<LostImg> selectAllByLostId(Long id);
}
