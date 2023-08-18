import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { Form, Col } from 'react-bootstrap';

// Datos de ejemplo: países y estados

const AutocompleteInput = ({states,countries,setSelectedCountry,
    setSelectedState}) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (inputValue) => {
    const inputValueLower = inputValue.toLowerCase();
    return states.filter(
      (state) =>
        state.name.toLowerCase().slice(0, inputValueLower.length) === inputValueLower
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestionValue,suggestion }) => {
    setSelectedCountry(suggestion.country)
    setSelectedState(suggestion.name)
    
    setValue(suggestionValue);
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.name} - {suggestion.country}
    </div>
  );

  const inputProps = {
    
    placeholder: 'Ingrese un estado',
    value,
    onChange: (_, { newValue }) => setValue(newValue),

  };
  
  

  return (
    <Col>
      <Form.Label>Estado</Form.Label>
      <Autosuggest

        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        
      />
    </Col>
  );
};

export default AutocompleteInput;
