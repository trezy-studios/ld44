/* globals
    $BUILD_BRANCH:false
    $BUILD_COMMIT:false
    $BUILD_COMMIT_RANGE:false
    $BUILD_DATE:false
    $BUILD_PATH:false
    $NODE_VERSION:false
    $NEXT_BUILD_ID:false
    $REPOSITORY_PATH:false
    $REPOSITORY_URL:false
    $VERSION:false
*/

// Module imports
import React from 'react'
import moment from 'moment'




// Component imports
import { PageWrapper } from '../components'




// Component Constants
const BUILD_BRANCH = $BUILD_BRANCH
const BUILD_COMMIT = $BUILD_COMMIT
const BUILD_COMMIT_RANGE = $BUILD_COMMIT_RANGE
const BUILD_DATE = $BUILD_DATE
const BUILD_PATH = $BUILD_PATH
const NODE_VERSION = $NODE_VERSION
const NEXT_BUILD_ID = $NEXT_BUILD_ID
const REPOSITORY_PATH = $REPOSITORY_PATH
const REPOSITORY_URL = $REPOSITORY_URL
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

            {BUILD_PATH && (
              <tr>
                <th>Built On:</th>

                <td>
                  <a target="_blank" rel="noopener noreferrer" href={BUILD_PATH}>
                    <time dateTime={BUILD_DATE}>{moment.utc(BUILD_DATE).format('MMMM Do YYYY, hh:mm z')}</time>
                  </a>
                </td>
              </tr>
            )}

            <tr>
              <th>Branch:</th>

              <td>
                <a target="_blank" rel="noopener noreferrer" href={`${REPOSITORY_URL}/tree/${BUILD_BRANCH}`}>
                  {BUILD_BRANCH}
                </a>
              </td>
            </tr>

            <tr>
              <th>Commit:</th>

              <td>
                <a target="_blank" rel="noopener noreferrer" href={`${REPOSITORY_URL}${BUILD_COMMIT_RANGE ? `/compare/${BUILD_COMMIT_RANGE}` : ''}`}>
                  {BUILD_COMMIT || 'null'}
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
          buildBranch: BUILD_BRANCH,
          buildCommit: BUILD_COMMIT,
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
