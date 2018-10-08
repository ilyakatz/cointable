import * as React from "react";
import { Icon, Message, Modal, Progress } from "semantic-ui-react";

interface IProps {
  onClose: () => void;
  requestSentToBlockchain: boolean;
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
                    New establishment was submitted to the blockchain.
                    It will appear in the list after the blockchain has confirm the transaction.
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