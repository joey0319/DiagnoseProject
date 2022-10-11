package com.ssafy.meongnyang.db.repository;

import com.ssafy.meongnyang.api.response.LostResponseDto;
import com.ssafy.meongnyang.db.entity.Lost;
import com.ssafy.meongnyang.db.entity.LostImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public interface LostRepository extends JpaRepository<Lost, Long> {
    @Query("select l from Lost l order by l.is_found asc, l.date desc")
    List<Lost> findAllWithSorting();
    @Query("select l from Lost l where l.user.id =:id order by l.is_found asc, l.date desc")
    List<Lost> findAllByUserId(Long id);
}