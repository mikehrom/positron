import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import SectionFooter from '../sections/footer'
import SectionList from '../section_list'
import { SectionHeader } from '../sections/header'
import { SectionHero } from '../sections/hero'

export class EditArticle extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired,
    channel: PropTypes.object.isRequired,
    lastUpdated: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    onChangeHero: PropTypes.func.isRequired
  }

  render () {
    const { article, channel, onChange } = this.props

    return (
      <div className='EditArticle'>

        {channel.hasFeature('hero') &&
          <SectionHero
            article={article}
            onChange={onChange}
          />
        }

        <SectionHeader {...this.props} />

        <SectionList
          article={article}
          sections={article.sections}
        />

        <SectionFooter
          article={article}
          onChange={onChange}
        />

      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  channel: state.app.channel,
  lastUpdated: state.edit.lastUpdated
})

export default connect(
  mapStateToProps
)(EditArticle)
