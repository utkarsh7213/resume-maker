// WishlistContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingStates, setLoadingStates] = useState({});
  const [wishlistKey, setWishlistKey] = useState(0);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Fetch courses
        // const coursesResponse = await axios.get('/api/fetchcourses');
        // if (coursesResponse.data.success) {
        //   setCourses(coursesResponse.data.courses);
        // }

        // Fetch wishlist (if session is available)
        if (session) {
          const wishlistResponse = await axios.get('/api/sendwishlist');
          if (wishlistResponse.data.success) {
            setWishlist(wishlistResponse.data.wishlist);
          }
        }
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [session]);

  const isCourseInWishlist = (courseId) => {
    return wishlist.includes(courseId);
  };

  const toggleWishlist = async (courseId) => {
    if (!session) {
      alert('Please log in to modify your wishlist');
      return;
    }
    setLoadingStates((prev) => ({ ...prev, [courseId]: true }));

    try {
      const response = await axios.post('/api/wishlist/toggle', { courseId });

      if (response.data.success) {
        setWishlist((prevWishlist) => {
          const isInWishlist = prevWishlist.includes(courseId);
          const updatedWishlist = isInWishlist
            ? prevWishlist.filter((id) => id !== courseId)
            : [...prevWishlist, courseId];

          return updatedWishlist;
        });

        setCurrentCourseId(courseId);
      } else {
        console.error('Failed to update wishlist');
      }
    } catch (error) {
      console.error('Error updating wishlist', error);
    }
    finally {
      setLoadingStates((prev) => ({ ...prev, [courseId]: false }))
    }
  };

  useEffect(() => {
    if (currentCourseId !== null) {
      const isInWishlist = wishlist.includes(currentCourseId);
      const toastMessage = isInWishlist ? 'Course added to wishlist!' : 'Course removed from wishlist';

      toast.success(toastMessage);
      setCurrentCourseId(null);
    }
  }, [wishlist, currentCourseId]);


  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isCourseInWishlist, courses, setCourses, wishlistKey,loadingStates, loading, }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
