import React from 'react'
import styles from './Post.module.css'
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { Link, useNavigate } from 'react-router-dom';
import axiosRes from 'axios';
import { MoreDropdown } from '../../components/MoreDropdown';


const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    postPage,
    setPosts
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`);
  }

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      navigate(-1); 
      }
     catch (err) {
      console.error(err);
    }};

  const handleLike = async () => {
    try {
      const { data: like } = await axiosRes.post(`/likes/`, { post_id: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: like.id }
            : post
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
          </Link>
          <div className='d-flex align-items-center'>
            <span>{updated_at}</span>
            {is_owner && postPage && <MoreDropdown 
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            /> }
          </div>
        </Media>
      </Card.Body>
      <Link to ={`/posts/${id}`} >
      <Card.Img src={image} alt={title} /> 
      </Link>
      <Card.Body>
        {title && <Card.Title className = "text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className = {styles.PostBar}>
          {is_owner ?(
            <OverlayTrigger placement = "top"  overlay={<Tooltip>You can't like your own post!</Tooltip>}>
              <i className='far fa-heart' />
            </OverlayTrigger>
          ) : like_id ?(
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart}${styles.Heart}`} />
            </span>
          ): currentUser ? (
            <span onClick={handleLike}>
              <i className={`fas fa-heart}${styles.HeartOutline}`} />
            </span>
          ):(
          <OverlayTrigger placement='top' overlay={<Tooltip>Log in to like posts!</Tooltip>}>

          </OverlayTrigger>
        )}
        {likes_count}
        <Link to={`/posts/${id}`}>
          <i className='far fa-comment' />
          {comments_count}
        </Link>
          </div>
        </Card.Body>
    </Card>
  )
    
  
}

export default Post
