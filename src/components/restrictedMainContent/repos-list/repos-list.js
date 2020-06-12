import React from 'react';
import './repos-list.scss';
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Button } from '@material-ui/core';

class ReposList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      setValue: ''
    }
  }

  reposList = this.props.reposList;
  listItems = reposList.map((item, i) =>
    <FormControlLabel value={'https://api.github.com/repos/' + item.org + '/' + item.repoName + '/commits'} key={i} control={<Radio />} label={item.org} />
  );

  componentDidMount() {
    this.setState({
      value: 'https://api.github.com/repos/' + reposList[0].org + '/' + reposList[0].repoName + '/commits'
    })
  }

  handleChange = (event) => {
    this.setState({
      setValue: event.target.value
    })
  };

  update = () => {
    this.this.props.onUpdate(this.state.value);
  }

  render() {
    return (
      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend">Lista repozytoriów</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
            {listItems}
          </RadioGroup>
        </FormControl>
        <Button variant="contained" onClick={() => { console.log('clicked') }}>Click me</Button>
      </div>
    );
  }
}

export default ReposList;
