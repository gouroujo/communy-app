import React from 'react';
import { Form, Select } from 'semantic-ui-react';
import { countries } from './countries.json';

export default class AddressInput extends React.PureComponent {

  handleChange = (ev, { name, value }) => {
    return this.props.onChange(ev, {
      name: this.props.name,
      value: Object.assign({}, this.props.value, { [name]: value })
    })
  }

  render() {
    const { road, postcode, city, country_code } = this.props.value;
    return (
      <Form.Group>
        <Form.Input
          width={6}
          name="road"
          label="Rue"
          placeholder="Rue"
          value={road || ''}
          onChange={this.handleChange}
        />
        <Form.Input
          width={2}
          name="postcode"
          label="Code postal"
          placeholder="Code postal"
          value={postcode || ''}
          onChange={this.handleChange}
        />
        <Form.Input
          width={4}
          name="city"
          label="Ville"
          placeholder="Ville"
          value={city || ''}
          onChange={this.handleChange}
        />
        <Form.Field width={3}>
          <label>Pays</label>
          <Select
            search
            name="country_code"
            value={country_code || 'fr'}
            placeholder='Pays'
            options={countries}
            onChange={this.handleChange} />
        </Form.Field>
      </Form.Group>
    )
  }
}
