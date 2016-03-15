import PointLocation from '../../components/wizard/add-point-location';
import PointName from '../../components/wizard/add-point-name';
import PointDescription from '../../components/wizard/add-point-description';
import PointHours from '../../components/wizard/add-point-hours';
import PointAmenities from '../../components/wizard/add-point-amenities';
import AlertNameDescription from '../../components/wizard/alert-name-description';

/* eslint-disable no-unused-vars */
import React from 'react';
import LocationIcon from 'material-ui/lib/svg-icons/maps/place';
import NameIcon from 'material-ui/lib/svg-icons/image/edit';
import DescIcon from 'material-ui/lib/svg-icons/editor/format-align-left';
import HoursIcon from 'material-ui/lib/svg-icons/action/schedule';
import AmenitiesIcon from 'material-ui/lib/svg-icons/maps/local-bar';
/* eslint-enable no-unused-vars */

export const PointLocationTab = {
  value: PointLocation,
  icon: <LocationIcon />,
  url: '/'
}

export const PointNameTab = {
  value: PointName,
  icon: <NameIcon />,
  url: '/name'
}

export const PointDescriptionTab = {
  value: PointDescription,
  icon: <DescIcon />,
  url: '/description'
}

export const AlertNameDescriptionTab = {
  value: AlertNameDescription,
  icon: <NameIcon />,
  url: '/name'
}

export const PointHoursTab = {
  value: PointHours,
  icon: <HoursIcon />,
  url: '/hours'
}

export const PointAmenitiesTab = {
  value: PointAmenities,
  icon: <AmenitiesIcon />,
  url: '/amenities'
}
