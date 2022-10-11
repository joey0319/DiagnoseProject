package com.ssafy.meongnyang.db.repository;

import com.ssafy.meongnyang.db.entity.Lost;
import com.ssafy.meongnyang.db.entity.ShowPet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShowPetRepository extends JpaRepository<ShowPet, Long> {
    @Query("select s from ShowPet s where s.user.id =:id order by s.date desc")
    List<ShowPet> findAllByUserId(Long id);
}
