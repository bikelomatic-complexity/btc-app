import PointLocation from '../../components/wizard/point-location';
import ServiceName from '../../components/wizard/service-name';
import ServiceDescription from '../../components/wizard/service-description';
import ServiceHours from '../../components/wizard/service-hours';
import ServiceAmenities from '../../components/wizard/service-amenities';
import AlertNameDescription from '../../components/wizard/alert-name-description';

/* eslint-disable no-unused-vars */
import React from 'react';
import LocationIcon from 'material-ui/svg-icons/maps/place';
import NameIcon from 'material-ui/svg-icons/image/edit';
import DescIcon from 'material-ui/svg-icons/editor/format-align-left';
import HoursIcon from 'material-ui/svg-icons/action/schedule';
import AmenitiesIcon from 'material-ui/svg-icons/maps/local-bar';
/* eslint-enable no-unused-vars */

export const PointLocationTab = {
  value: PointLocation,
  icon: <LocationIcon />,
  url: ''
};

export const ServiceNameTab = {
  value: ServiceName,
  icon: <NameIcon />,
  url: 'name'
};

export const ServiceDescriptionTab = {
  value: ServiceDescription,
  icon: <DescIcon />,
  url: 'description'
};

export const AlertNameDescriptionTab = {
  value: AlertNameDescription,
  icon: <NameIcon />,
  url: 'name'
};

export const ServiceHoursTab = {
  value: ServiceHours,
  icon: <HoursIcon />,
  url: 'hours'
};

export const ServiceAmenitiesTab = {
  value: ServiceAmenities,
  icon: <AmenitiesIcon />,
  url: 'amenities'
};
