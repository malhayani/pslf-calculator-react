import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

  const CardContainer = (props) => {
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle className="card-container-title">{props.title}</CardTitle>
            <CardSubtitle className="card-container-subtitle">{props.subtitle}</CardSubtitle>
            { props.children }
            { props.back 
                ? <Button 
                    onClick={props.backClick} 
                    value={false} 
                    name={props.backName} 
                    className="btn btn-secondary back-btn">
                      {props.backText}
                  </Button>
                : ""
            }
            { props.next 
                ? <Button 
                    onClick={props.nextClick} 
                    value={true} 
                    name={props.nextName} 
                    className="btn btn-primary continue-btn">
                      {props.nextText}
                  </Button>
                : ""
            }
          </CardBody>
        </Card>
      </div>
    );
  };
  
  export default CardContainer;