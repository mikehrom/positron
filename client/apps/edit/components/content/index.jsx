import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import EditArticle from './article_layouts/article'
import { EditSeries } from './article_layouts/series'
import { EditVideo } from './article_layouts/video'

export class EditContent extends Component {
  static propTypes = {
    article: PropTypes.object
  }

  getArticleLayout = () => {
    const { article } = this.props

    switch (article.layout) {
      case 'series': {
        return <EditSeries {...this.props} />
      }
      case 'video': {
        return <EditVideo {...this.props} />
      }
      default: {
        return <EditArticle />
      }
    }
  }

  render () {
    const { article } = this.props

    return (
      <div
        className={'EditContent'}
        data-layout={article.layout}
      >
        {this.getArticleLayout()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  article: state.edit.article
})

export default connect(
  mapStateToProps
)(EditContent)
