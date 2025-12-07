import { collection, getDocs } from 'firebase/firestore'
import { Dispatch } from 'redux'

import { db } from '../../../config/firebase.config'
import { categoryConverter } from '../../../converters/firestore.converter'
import Category from '../../../types/category.type'
import CategoryActionTypes from './category.actions-types'

export const fetchCategories = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: CategoryActionTypes.FETCH_CATEGORIES_START })

    try {
      const categoriesFromFirestore: Category[] = []

      const querySnapshot = await getDocs(
        collection(db, 'categories').withConverter(categoryConverter)
      )

      querySnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data())
      })

      dispatch({
        type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
        payload: categoriesFromFirestore
      })
    } catch (error) {
      dispatch({
        type: CategoryActionTypes.FETCH_CATEGORIES_FAILURE
      })
    }
  }
}