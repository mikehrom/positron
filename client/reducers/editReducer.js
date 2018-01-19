import u from 'updeep'
import { actions } from 'client/actions/editActions'

export const initialState = {
  activeSection: null,
  activeView: 'content',
  error: null,
  isDeleting: false,
  isPublishing: false,
  isSaving: false,
  isSaved: true,
  lastUpdated: null
}

export function editReducer (state = initialState, action) {
  switch (action.type) {
    case actions.CHANGE_SAVED_STATUS: {
      return u({
        isSaving: false,
        isSaved: action.payload.isSaved,
        lastUpdated: action.payload.lastUpdated
      }, state)
    }
    case actions.CHANGE_SECTION: {
      return u({
        activeSection: action.payload.activeSection
      }, state)
    }
    case actions.CHANGE_VIEW: {
      return u({
        activeView: action.payload.activeView
      }, state)
    }
    case actions.DELETE_ARTICLE: {
      return u({
        isDeleting: action.payload.isDeleting
      }, state)
    }
    case actions.ERROR: {
      return u({
        error: action.payload.error
      }, state)
    }
    case actions.PUBLISH_ARTICLE: {
      return u({
        isPublishing: action.payload.isPublishing
      }, state)
    }
    case actions.SAVE_ARTICLE: {
      return u({
        isSaving: true
      }, state)
    }
  }

  return state
}
