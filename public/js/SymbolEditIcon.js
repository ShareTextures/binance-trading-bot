/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
class SymbolEditIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      symbolInfo: {}
    };

    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidUpdate(nextProps) {
    // Only update configuration, when the modal is closed and different.
    if (
      this.state.showModal === false &&
      _.isEmpty(nextProps.symbolInfo) === false &&
      _.isEqual(nextProps.symbolInfo, this.state.symbolInfo) === false
    ) {
      this.setState({
        symbolInfo: nextProps.symbolInfo
      });
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    console.log(
      'handleFormSubmit this.state.symbolInfo ',
      this.state.symbolInfo
    );

    this.props.sendWebSocket('symbol-update', this.state.symbolInfo);
    this.handleModalClose();
  }

  handleModalShow() {
    this.setState({
      showModal: true
    });
  }

  handleModalClose() {
    this.setState({
      showModal: false
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value =
      target.type === 'checkbox'
        ? target.checked
        : target.type === 'number'
        ? +target.value
        : target.value;
    const stateKey = target.getAttribute('data-state-key');

    const { symbolInfo } = this.state;

    this.setState({
      symbolInfo: _.set(symbolInfo, stateKey, value)
    });
  }

  render() {
    const { symbolInfo } = this.state;

    if (_.isEmpty(symbolInfo)) {
      return '';
    }

    return (
      <div className='header-column-icon-wrapper symbol-edit-wrapper'>
        <button
          type='button'
          className='btn btn-sm btn-link p-0 pl-1 pr-1'
          onClick={this.handleModalShow}>
          <i className='fa fa-edit'></i>
        </button>
        <Modal
          show={this.state.showModal}
          onHide={this.handleModalClose}
          size='sm'>
          <Form onSubmit={this.handleFormSubmit}>
            <Modal.Header className='pt-1 pb-1'>
              <Modal.Title>Edit Symbol</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h2 className='form-header'>Sell</h2>
              <Form.Group controlId='field-candles-interval'>
                <Form.Label>Last Buy Price</Form.Label>
                <Form.Control
                  size='sm'
                  type='number'
                  placeholder='Enter last buy price'
                  required
                  min='0'
                  step='0.0001'
                  data-state-key='sell.lastBuyPrice'
                  defaultValue={symbolInfo.sell.lastBuyPrice}
                  onChange={this.handleInputChange}
                />
                <Form.Text className='text-muted'>
                  Set last buy price of the symbol.
                </Form.Text>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='secondary'
                size='sm'
                onClick={this.handleModalClose}>
                Close
              </Button>
              <Button type='submit' variant='primary' size='sm'>
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}
