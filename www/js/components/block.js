/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Paper, RaisedButton, TextField } from 'material-ui';
/*eslint-enable no-unused-vars*/

import classNames from 'classnames';
import _ from 'underscore';
import { isObject, isString } from 'lodash';

const spacer = {
  height: 20
};

export class FormBlock extends Component {
  constructor( props ) {
    super( props );
    _.bindAll( this, 'onAction' );
  }

  onAction() {
    if ( this.props.onAction ) {
      const fields = _( this.props.fields ).pluck( 'name' );
      const values = _( this.refs ).chain()
        .pick( fields )
        .mapObject( ( val, key ) => {
          return val.getValue();
        } )
        .value();

      this.props.onAction( values );
    }
  }

  render() {
    let props = {};
    const {header, problemText, footer} = this.props;
    if ( problemText ) {
      props.header = problemText;
      props.problem = true;
    } else if ( header ) {
      props.header = header;
      props.problem = false;
    }

    if ( footer ) {
      props.footer = footer;
    }

    const boxes = this.props.fields.map( field => {
      let textProps = {};

      const error = _.findWhere( this.props.validation, {
        dataPath: '.' + field.name
      } );
      if ( error ) {
        textProps.errorText = error.message;
      }

      if ( [ 'email', 'password' ].indexOf( field.name ) > 0 ) {
        textProps.type = field.name;
      }

      return (
        <TextField { ...textProps }
          key={ field.name }
          hintText={ field.hint }
          ref={ field.name }
          underlineShow={ true }
          fullWidth={ true } />
        );
    } );

    return (
      <Block { ...props }>
        { boxes }
        <div style={ spacer } />
        <RaisedButton secondary
          className="entry__action"
          fullWidth={ true }
          onClick={ this.onAction }
          label={ this.props.actionText } />
      </Block>
      );
  }
}

export class Block extends Component {
  render() {
    const problem = this.props.problem;
    const headerClasses = classNames( 'entry__header', {
      'entry__header--error': problem
    } );

    const _header = this.props.header;
    let header;
    if ( isObject( _header ) ) {
      header = _header;
    } else if ( isString( _header ) ) {
      header = <div className={ headerClasses }>
                 { _header }
               </div>;
    }

    const _footer = this.props.footer;
    let footer;
    if ( isObject( _footer ) ) {
      footer = _footer;
    } else if ( isString( _footer ) ) {
      footer = <div className='entry__footer'>
                 { _footer }
               </div>;
    }

    return (
      <Paper className="entry" zDepth={ 2 }>
        { header }
        { this.props.children }
        { footer }
      </Paper>
    );
  }
}

export class BlockFooter extends Component {
  render() {
    return <div className='entry__footer'>
             { this.props.children }
           </div>;
  }
}

export function errorProps( error, validation ) {
  let errorProps = {};
  if ( validation ) {
    errorProps.validation = validation;
  }
  if ( error ) {
    errorProps.problemText = error;
  }
  return errorProps;
}
