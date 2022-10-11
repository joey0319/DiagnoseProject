package com.ssafy.meongnyang.api.service;

import com.ssafy.meongnyang.api.request.CommentRegisterDto;
import com.ssafy.meongnyang.api.request.CommentUpdateDto;
import com.ssafy.meongnyang.api.response.CommentResponseDto;
import com.ssafy.meongnyang.common.exception.AccessDeniedException;
import com.ssafy.meongnyang.common.exception.CommentNotFoundException;
import com.ssafy.meongnyang.common.exception.ShowPetNotFoundException;
import com.ssafy.meongnyang.common.exception.UserNotFoundException;
import com.ssafy.meongnyang.common.util.TokenProvider;
import com.ssafy.meongnyang.db.entity.Comment;
import com.ssafy.meongnyang.db.entity.ShowPet;
import com.ssafy.meongnyang.db.entity.User;
import com.ssafy.meongnyang.db.repository.CommentRepository;
import com.ssafy.meongnyang.db.repository.ShowPetRepository;
import com.ssafy.meongnyang.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final ShowPetRepository showPetRepository;
    private final TokenProvider tokenProvider;

    @Override
    public CommentResponseDto writeComment(String accessToken, CommentRegisterDto commentRegisterDto) {
        String uid = tokenProvider.getUserId(accessToken);
        User user = userRepository.findById(Long.parseLong(uid)).orElseThrow(UserNotFoundException::new);
        ShowPet showPet = showPetRepository.findById(commentRegisterDto.getId()).orElseThrow(ShowPetNotFoundException::new);

        Comment comment = Comment.builder()
                .content(commentRegisterDto.getContent())
                .showpet(showPet)
                .user(user)
                .build();

        Comment commentResponse = commentRepository.save(comment);

        CommentResponseDto commentResponseDto = CommentResponseDto.builder()
                .id(commentResponse.getId())
                .user_id(commentResponse.getUser().getId())
                .user_nickname(commentResponse.getUser().getNickname())
                .content(commentResponse.getContent())
                .date(commentResponse.getDate()).build();
        return commentResponseDto;
    }

    @Override
    public CommentResponseDto updateComment(String accessToken, CommentUpdateDto commentUpdateDto) {
        String uid = tokenProvider.getUserId(accessToken);
        Comment comment = commentRepository.findById(commentUpdateDto.getId()).orElseThrow(CommentNotFoundException::new);

        if (Long.parseLong(uid) != comment.getUser().getId()) {
            throw new AccessDeniedException();
        }
        comment.updateComment(commentUpdateDto);

        CommentResponseDto commentResponseDto = CommentResponseDto.builder()
                .id(comment.getId())
                .user_id(comment.getUser().getId())
                .user_nickname(comment.getUser().getNickname())
                .content(comment.getContent())
                .date(comment.getDate()).build();
        return commentResponseDto;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentResponseDto> getCommentList(long id) {
        ShowPet showPet = showPetRepository.findById(id).orElseThrow(ShowPetNotFoundException::new);

        List<CommentResponseDto> list = showPet.getCommentList().stream().map(comment -> CommentResponseDto.builder()
                        .id(comment.getId())
                        .user_id(comment.getUser().getId())
                        .content(comment.getContent())
                        .user_nickname(comment.getUser().getNickname())
                        .date(comment.getDate()).build())
                .collect(Collectors.toList());

        return list;
    }

    @Override
    public boolean deleteComment(String accessToken, long id) {
        String uid = tokenProvider.getUserId(accessToken);
        Comment comment = commentRepository.findById(id).orElseThrow(CommentNotFoundException::new);

        if (Long.parseLong(uid) != comment.getUser().getId()) {
            throw new AccessDeniedException();
        }
        commentRepository.deleteById(id);
        return true;
    }
}
