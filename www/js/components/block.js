/*eslint-disable no-unused-vars*/
import React, { Component } from 'react';
import { Paper, RaisedButton, TextField } from 'material-ui';
/*eslint-enable no-unused-vars*/

import classNames from 'classnames';
import _, { bindAll, isObject, isString } from 'lodash';

// This component extends the `Block` with form inputs inside. It is also able
// to display form validation comments if they are supplied.
export class FormBlock extends Component {
  constructor( props ) {
    super( props );
    bindAll( this, 'onAction' );
  }

  // If an `onAction` callback has been supplied, call it with field values
  // obtained from each text box. `values` is an object with field, field-value
  // pairs.
  onAction() {
    if ( this.props.onAction ) {
      const fields = _( this.props.fields )
        .map( 'name' )
        .value();
      const values = _( this.refs )
        .pick( fields )
        .mapValues( val => val.getValue() )
        .value();

      this.props.onAction( values );
    }
  }

  // Generate text boxes for each field, and display validation text for each
  // text box if it exists. The validation object needs to be in json schema
  // format.
  boxes() {
    return this.props.fields.map( field => {
      let textProps = {};

      const error = _.find( this.props.validation, {
        dataPath: '.' + field.name
      } );
      if ( error ) {
        textProps.errorText = error.message;
      }

      if ( [ 'email', 'password' ].indexOf( field.name ) >= 0 ) {
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
  }

  render() {
    const {header, problemText, footer} = this.props;
    let props = {};

    // If problemText has been supplied, use that as the `Block`'s header
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

    return (
      <Block { ...props }>
              { this.boxes() }
              <div className='entry__spacer' />
              <RaisedButton secondary
                className="entry__action"
                fullWidth={ true }
                onClick={ this.onAction }
                label={ this.props.actionText } />
      </Block>
      );
  }
}

FormBlock.defaultProps = {
  problemText: null,
  validation: []
};
FormBlock.propTypes = {
  header: React.PropTypes.oneOfType( [
    React.PropTypes.string,
    React.PropTypes.object
  ] ),
  footer: React.PropTypes.oneOfType( [
    React.PropTypes.string,
    React.PropTypes.object
  ] ),
  problemText: React.PropTypes.string,
  validation: React.PropTypes.array
};

// The `Block` is a piece of material-ui paper that has optional header and
// footers. The header and footer may be specified either as strings, or as
// ready-made react components.
//
// If you specify the header or footer as strings, `Block` will construct
// a default header or footer with that text. Additionally, if the `problem`
// prop is set to true, then the `Block` will format the header in red.
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
      <Paper className="entry"
        zDepth={ 2 }>
        { header }
        { this.props.children }
        { footer }
      </Paper>
      );
  }
}

Block.defaultProps = {
  problem: false
};
Block.propTypes = {
  problem: React.PropTypes.bool,
  header: React.PropTypes.oneOfType( [
    React.PropTypes.string,
    React.PropTypes.object
  ] ),
  footer: React.PropTypes.oneOfType( [
    React.PropTypes.string,
    React.PropTypes.object
  ] )
};

// If you want to use a custom footer with `Block` or `FormBlock`, you can
// use this component as a base.
export class BlockFooter extends Component {
  render() {
    return <div className='entry__footer'>
             { this.props.children }
           </div>;
  }
}

// Return a props object to transfer to the `FormBlock`. It will only include
// relevant properties (props that are defined).
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
