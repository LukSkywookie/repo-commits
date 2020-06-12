import React from 'react';
import './restricted-main-content.scss';
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';

class RestrictedMainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reposList: [
        { org: 'anopara', repoName: 'genetic-drawing' },
        { org: 'apple', repoName: 'password-manager-resources' },
        { org: 'defund12', repoName: 'defund12.org' },
        { org: 'Say-Their-Name', repoName: 'say-their-names-ios' }
      ],
      value: '',
      setValue: '',
      repoCommits: []
    };
  }

  fetchFoo = (url) => {
    fetch(url)
      .then(result => result.json())
      .then(data => {
        this.setState({
          repoCommits: data.map(res => {
            return res
          })
        })
      })
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value }, () => {
      const url = this.state.value;
      this.fetchFoo(url);
    });
  };

  componentDidMount() {
    this.setState({ value: 'https://api.github.com/repos/' + this.state.reposList[0].org + '/' + this.state.reposList[0].repoName + '/commits' }, () => {
      this.fetchFoo(this.state.value);
    });
  }

  render() {
    this.listItems = this.state.reposList.map((item, i) =>
      <FormControlLabel value={'https://api.github.com/repos/' + item.org + '/' + item.repoName + '/commits'} key={i} control={<Radio />} label={item.org} />
    );

    this.slicedArray = [];

    if (this.state.repoCommits.length !== 0) {
      this.slicedArray = this.state.repoCommits.slice(1, 7);
    }

    return (
      <div className="restricted">
        <aside>
          <FormControl component="fieldset">
            <FormLabel component="legend">Lista repozytoriów</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={this.state.value} onChange={this.handleChange}>
              {this.listItems}
            </RadioGroup>
          </FormControl>
        </aside>
        <main>
          <h1>Ostatnie commity: </h1>
          <ul className="listing-commits">
            {
              this.slicedArray.map((res, i) => {
                return (
                  <React.Fragment key={i}>
                    <li key={i}>
                      <span><b>SHA:</b><br/> {res.sha}</span>
                      <span><b>NAME:</b><br/> {res.commit.author.name}</span>
                      <span><b>DATE:</b><br/> {new Date(res.commit.author.date).toLocaleString()}</span>
                      <span><b>EMAIL:</b><br/> {res.commit.author.email}</span>
                    </li>
                  </React.Fragment>
                )
              })
            }
          </ul>
        </main>
      </div>
    )
  }
}

export default RestrictedMainContent;
