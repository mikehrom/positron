import React from 'react'
import Article from '/client/models/article.coffee'
import { PlainText } from '/client/components/rich_text2/components/plain_text.jsx'
import SectionHeader from '../index.jsx'
import { mount } from 'enzyme'

import components from '@artsy/reaction-force/dist/Components/Publishing/index'
const Header = components.Header
const ClassicArticle = components.Fixtures.ClassicArticle
const FeatureArticle = components.Fixtures.FeatureArticle
const StandardArticle = components.Fixtures.StandardArticle

jest.mock('react-sizeme', () => jest.fn(c => d => d))

describe('Header', () => {
  describe('Classic', () => {
    const props = {
      article: new Article(ClassicArticle)
    }

    it('renders the classic header', () => {
      const component = mount(
        <SectionHeader {...props} />
      )
      expect(component.find(Header).length).toBe(1)
      expect(component.html()).toMatch('ClassicHeader__ClassicHeaderContainer')
      expect(component.html()).toMatch('ClassicHeader__Title')
      expect(component.html()).toMatch('AuthorDateClassic')
      expect(component.html()).toMatch('Joanne Artman Gallery')
    })

    it('renders a saved title', () => {
      const component = mount(
        <SectionHeader {...props} />
      )
      expect(component.html()).toMatch('New Study of Yale Grads Shows the Gender Pay Gap for Artists Is Not So Simple')
      expect(component.html()).toMatch('<div class="plain-text" name="title">')
      expect(component.find(PlainText).props().placeholder).toMatch('Title')
    })

    it('renders a title input', () => {
      props.article.set('title', '')
      const component = mount(
        <SectionHeader {...props} />
      )
      expect(component.html()).toMatch('<div class="plain-text" name="title">')
      expect(component.html()).toMatch('public-DraftEditorPlaceholder-inner')
    })

    it('renders a leadParagraph input', () => {
      const component = mount(
        <SectionHeader {...props} />
      )
      expect(component.html()).toMatch('rich-text--paragraph')
      expect(component.find('.public-DraftEditorPlaceholder-inner').length).toBe(1)
      expect(component.find('.rich-text--paragraph').at(0).text()).toMatch(
        'Critics were skeptical of Bambi when it was first released in 1942'
      )
    })
  })

  describe('Feature', () => {
    const props = {
      article: new Article(FeatureArticle)
    }
    props.article.heroSection.set('type', 'split')

    it('renders the feature header', () => {
      const component = mount(
        <SectionHeader {...props} />
      )
      expect(component.find(Header).length).toBe(1)
      expect(component.html()).toMatch('FeatureHeader__Div')
      expect(component.html()).toMatch('FeatureHeader__Vertical')
      expect(component.html()).toMatch('FeatureHeader__Title')
      expect(component.html()).toMatch('FeatureHeader__Deck')
      expect(component.html()).toMatch('Casey Lesser')
    })

    it('renders feature layout controls', () => {
      const component = mount(
        <SectionHeader {...props} />
      )
      expect(component.html()).toMatch('edit-header--controls')
      expect(component.html()).toMatch('Change Header')
    })

    it('renders a saved title', () => {
      const component = mount(
        <SectionHeader {...props} />
      )
      expect(component.html()).toMatch('What’s the Path to Winning an Art Prize?')
      expect(component.html()).toMatch('<div class="plain-text" name="title">')
    })

    it('renders a title input', () => {
      props.article.set('title', '')
      const component = mount(
        <SectionHeader {...props} />
      )
      expect(component.html()).toMatch('<div class="plain-text" name="title">')
      expect(component.find('.public-DraftEditorPlaceholder-inner').length).toBe(1)
    })

    it('renders a saved file', () => {
      const component = mount(
        <SectionHeader {...props} />
      )
      expect(component.html()).toMatch('<video class="FeatureHeader__FeatureVideo')
      expect(component.html()).toMatch(
        'src="https://artsy-media-uploads.s3.amazonaws.com/z9w_n6UxxoZ_u1lzt4vwrw%2FHero+Loop+02.mp4"'
      )
    })

    it('renders a file input if no file', () => {
      props.article.heroSection.set('url', '')
      const component = mount(
        <SectionHeader {...props} />
      )
      expect(component.html()).toMatch('<h1>Add Image or Video</h1>')
      expect(component.html()).toMatch('file-input__upload-container')
      expect(component.html()).toMatch('<input type="file" accept=".jpg,.jpeg,.png,.gif,.mp4">')
    })

    describe('Layout: Fullscreen', () => {
      it('renders a file input when has file', () => {
        props.article.heroSection.set({
          type: 'fullscreen',
          url: 'https://artsy-media-uploads.s3.amazonaws.com/z9w_n6UxxoZ_u1lzt4vwrw%2FHero+Loop+02.mp4'
        })
        const component = mount(
          <SectionHeader {...props} />
        )
        expect(component.html()).toMatch('file-input__upload-container')
        expect(component.html()).toMatch('<input type="file" accept=".jpg,.jpeg,.png,.gif,.mp4">')
      })

      it('renders change background prompt if has file', () => {
        const component = mount(
          <SectionHeader {...props} />
        )
        expect(component.html()).toMatch('<h1>Change Background</h1>')
      })

      it('renders add background prompt if no file', () => {
        props.article.heroSection.set({url: '', type: 'fullscreen'})
        const component = mount(
          <SectionHeader {...props} />
        )
        expect(component.html()).toMatch('<h1>Add Background</h1>')
      })
    })
  })

  describe('Standard', () => {
    const props = {
      article: new Article(StandardArticle)
    }

    it('renders the standard header', () => {
      const component = mount(
        <SectionHeader {...props} />
      )
      expect(component.find(Header).length).toBe(1)
      expect(component.html()).toMatch('StandardHeader__StandardHeaderContainer')
      expect(component.html()).toMatch('StandardHeader__Vertical')
      expect(component.html()).toMatch('Art Market')
      expect(component.html()).toMatch('StandardHeader__Title')
      expect(component.html()).toMatch('Artsy Editorial')
    })

    it('renders a saved title', () => {
      const component = mount(
        <SectionHeader {...props} />
      )
      expect(component.html()).toMatch("New York's Next Art District")
      expect(component.html()).toMatch('<div class="plain-text" name="title">')
      expect(component.find('.public-DraftEditorPlaceholder-inner').length).toBe(0)
    })

    it('renders a title input', () => {
      props.article.set('title', '')
      const component = mount(
        <SectionHeader {...props} />
      )
      expect(component.html()).toMatch('<div class="plain-text" name="title">')
      expect(component.find('.public-DraftEditorPlaceholder-inner').length).toBe(1)
    })
  })
})
