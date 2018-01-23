import * as editActions from '../editActions'
import Article from '../../models/article'
import { Fixtures } from '@artsy/reaction-force/dist/Components/Publishing'
const { FeatureArticle } = Fixtures

describe('editActions', () => {
  let article

  beforeEach(() => {
    article = new Article(FeatureArticle)
    article.destroy = jest.fn()
    article.save = jest.fn()
  })

  it('#changeSavedStatus updates article and sets isSaved to arg', () => {
    article.set('title', 'Cool article')
    const changeSavedStatus = editActions.changeSavedStatus(article.attributes, true)

    expect(changeSavedStatus.type).toBe('CHANGE_SAVED_STATUS')
    expect(changeSavedStatus.payload.isSaved).toBe(true)
    expect(changeSavedStatus.payload.article.title).toBe('Cool article')
  })

  it('#changeSection sets activeSection to arg', () => {
    const changeSection = editActions.changeSection(6)

    expect(changeSection.type).toBe('CHANGE_SECTION')
    expect(changeSection.payload.activeSection).toBe(6)
  })

  it('#changeView sets the activeView to arg', () => {
    const changeView = editActions.changeView('display')

    expect(changeView.type).toBe('CHANGE_VIEW')
    expect(changeView.payload.activeView).toBe('display')
  })

  it('#deleteArticle destroys the article and sets isDeleting', () => {
    const deleteArticle = editActions.deleteArticle(article)

    expect(deleteArticle.type).toBe('DELETE_ARTICLE')
    expect(deleteArticle.payload.isDeleting).toBe(true)
    expect(article.destroy.mock.calls.length).toBe(1)
  })

  it('#publishArticle changes the publish status and saves the article', () => {
    const publishArticle = editActions.publishArticle(article)

    expect(publishArticle.type).toBe('PUBLISH_ARTICLE')
    expect(publishArticle.payload.isPublishing).toBe(!article.get('published'))
    expect(article.save.mock.calls.length).toBe(1)
  })

  it('#saveArticle sets isSaving to true and saves the article', () => {
    const saveArticle = editActions.saveArticle(article)

    expect(saveArticle.type).toBe('SAVE_ARTICLE')
    expect(saveArticle.payload.isSaving).toBe(true)
    expect(article.save.mock.calls.length).toBe(1)
  })

  describe('Editing errors', () => {
    it('#logError sets error to arg', () => {
      const message = 'Error message'
      const logError = editActions.logError({ message })

      expect(logError.type).toBe('ERROR')
      expect(logError.payload.error.message).toBe(message)
    })

    it('#resetError sets error to null', () => {
      const message = 'Error message'
      const resetError = editActions.resetError({ message })

      expect(resetError.type).toBe('ERROR')
      expect(resetError.payload.error).toBe(null)
    })
  })
})
