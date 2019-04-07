import ContentLoader from "react-content-loader"
import React from 'react'

const DetailPageSkeleton = () => (
  <ContentLoader
    height={160}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="54" y="13" rx="0" ry="0" width="306" height="9" />
    <rect x="110" y="32" rx="0" ry="0" width="202" height="4" />
    <rect x="49" y="45" rx="0" ry="0" width="316" height="179" />
  </ContentLoader>
)


export default DetailPageSkeleton
