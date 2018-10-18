import { Component } from "react";
import * as React from "react";
import { Link } from 'react-router-dom'
import { Card, Icon, Image } from 'semantic-ui-react'
import { IEstablishment } from "../typings/types";

interface IProps {
  establishment: IEstablishment
}

class Establishment extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: props.establishment.name,
      submitter: props.establishment.address
    };
  }

  public render() {
    return (
      <Card>
        <Image src='/food.jpg' />
        <Card.Content>
          <Link to={`establishment/${this.props.establishment.id}`}>
            <Card.Header>{this.props.establishment.name}</Card.Header>
          </Link>
          <Card.Description>
            <Card.Content>
              <Icon name='user circle' />
              <a href={`https://${process.env.REACT_APP_BLOCKCHAIN_EXPLORER}/address/${this.props.establishment.address}`}>
                {this.props.establishment.address.substr(0, 26)}
              </a>
            </Card.Content>
          </Card.Description>
        </Card.Content>
        <Card.Content >
          <Icon name='sticky note' />
          {this.props.establishment.numberOfReviews} Reviews
        </Card.Content>
      </Card>
    );
  }
}

export default Establishment;