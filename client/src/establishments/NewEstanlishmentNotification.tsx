import * as React from "react";
import { Icon, Message, Modal, Progress } from "semantic-ui-react";

interface IProps {
  onClose: () => void;
  requestSentToBlockchain: boolean;
  txn: string;
}

const NewEstablishmentNotification: React.SFC<IProps> = props => {
  return (
    <Modal
      open={props.requestSentToBlockchain}
      header='Thanks!'
      content={
        (
          <div>
            <Message
              content={
                (
                  <div>
                    <Progress progress={false} value={35} total={50} />
                    <Icon name='ethereum' color="blue" />
                    New establishment was submitted to the blockchain (<a href={`https://${process.env.REACT_APP_BLOCKCHAIN_EXPLORER}/address/${props.txn}`}>
                      {props.txn}
                    </a>)
                    <p>
                      It will appear in the list after the blockchain has confirmed the transaction.
                    </p>
                  </div>
                )
              }
            />
          </div>
        )
      }
      onClose={props.onClose}
      actions={[{ key: 'done', content: 'Done', positive: true }]}
    />
  );
}

export default NewEstablishmentNotification;