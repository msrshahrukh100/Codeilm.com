import ContentLoader from "react-content-loader"
import React from 'react'
import MediaCard from '../MediaCard/MediaCard'

const ListPageSkeleton = () => {
    const preloader = (
      <ContentLoader
        height='155'
        width='1793'
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
        preserveAspectRatio="true"
      >
        <rect x="0" y="18" rx="0" ry="0" width="1500" height="25" />

        <circle cx="30" cy="90" r="25" />
        <rect x="70" y="70" rx="0" ry="0" width="190" height="8" />
        <rect x="70" y="90" rx="0" ry="0" width="80" height="6" />

        <rect x="5" y="140" rx="0" ry="0" width="30" height="13" />
        <rect x="40" y="140" rx="0" ry="0" width="30" height="13" />
      </ContentLoader>
    )

    return (
      <>
      <MediaCard content={preloader} />
      <MediaCard content={preloader} />
      <MediaCard content={preloader} />
      </>
    )

}

export default ListPageSkeleton
