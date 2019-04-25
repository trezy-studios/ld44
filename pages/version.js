/* globals
$CIRCLE_SHA1:false
    $CIRCLE_BRANCH:false
    $CIRCLE_BUILD_URL:false
    $CIRCLE_COMPARE_URL:false
    $CIRCLE_SHA1:false

    $BUILD_DATE:false
    $NODE_VERSION:false
    $NEXT_BUILD_ID:false
    $VERSION:false
*/

// Module imports
import React from 'react'
import moment from 'moment'




// Component imports
import { PageWrapper } from '../components'




// Component Constants
const CIRCLE_BRANCH = $CIRCLE_BRANCH
const CIRCLE_BUILD_URL = $CIRCLE_BUILD_URL
const CIRCLE_COMPARE_URL = $CIRCLE_COMPARE_URL
const CIRCLE_SHA1 = $CIRCLE_SHA1

const BUILD_DATE = $BUILD_DATE
const NODE_VERSION = $NODE_VERSION
const NEXT_BUILD_ID = $NEXT_BUILD_ID
const REPOSITORY_PATH = /https:\/\/circleci\.com\/gh\/(.*\/.*)\/24/.exec($CIRCLE_BUILD_URL)[1]
const REPOSITORY_URL = `https://github.com/${REPOSITORY_PATH}`
const VERSION = $VERSION




const Version = () => (
  <PageWrapper title="Version Information">
    <section>
      <header>
        <h2>Application Version</h2>
      </header>

      <div>
        <table>
          <tbody>
            <tr>
              <th>App Version:</th>

              <td>
                <a target="_blank" rel="noopener noreferrer" href={`https://github.com/${REPOSITORY_PATH}/releases/tag/v${VERSION}`}>v{VERSION}</a>
              </td>
            </tr>

            {CIRCLE_BUILD_URL && (
              <tr>
                <th>Built On:</th>

                <td>
                  <a target="_blank" rel="noopener noreferrer" href={CIRCLE_BUILD_URL}>
                    <time dateTime={BUILD_DATE}>{moment.utc(BUILD_DATE).format('MMMM Do YYYY, hh:mm z')}</time>
                  </a>
                </td>
              </tr>
            )}

            <tr>
              <th>Branch:</th>

              <td>
                <a target="_blank" rel="noopener noreferrer" href={`${REPOSITORY_URL}/tree/${CIRCLE_BRANCH}`}>
                  {CIRCLE_BRANCH}
                </a>
              </td>
            </tr>

            <tr>
              <th>Commit:</th>

              <td>
                  {CIRCLE_SHA1 || 'null'}
                <a target="_blank" rel="noopener noreferrer" href={CIRCLE_COMPARE_URL}>
                </a>
              </td>
            </tr>

            <tr>
              <th>Node Version:</th>

              <td>
                <a target="_blank" rel="noopener noreferrer" href={`https://github.com/nodejs/node/releases/tag/${NODE_VERSION}`}>
                  {NODE_VERSION}
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <a className="button" href="/version?raw=true">View Raw</a>
      </div>
    </section>
  </PageWrapper>
)

Version.getInitialProps = ({ query, res }) => {
  if (query.raw) {
    res.setHeader('Content-Type', 'application/vnd.api+json')
    res.end(JSON.stringify({
      data: {
        id: NEXT_BUILD_ID,
        type: 'webMetadata',
        attributes: {
          buildCommit: CIRCLE_SHA1,
          buildBranch: CIRCLE_BRANCH,
          buildDate: BUILD_DATE,
          nodeVersion: NODE_VERSION,
          version: `v${VERSION}`,
        },
      },
    }))
  }

  return {}
}





export default Version
