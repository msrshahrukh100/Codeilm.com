import ContentLoader from "react-content-loader"
import React from 'react'

const ListPageSkeleton = () => (
  <ContentLoader
    height={160}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="18" rx="0" ry="0" width="249" height="5" />
    <rect x="0" y="31" rx="0" ry="0" width="91" height="3" />
    <rect x="0" y="40" rx="0" ry="0" width="91" height="3" />
    <rect x="0" y="52" rx="0" ry="0" width="18" height="7" />

    <rect x="0" y="70" rx="0" ry="0" width="249" height="5" />
    <rect x="0" y="83" rx="0" ry="0" width="91" height="3" />
    <rect x="0" y="92" rx="0" ry="0" width="91" height="3" />
    <rect x="0" y="104" rx="0" ry="0" width="18" height="7" />

  </ContentLoader>

)

export default ListPageSkeleton
