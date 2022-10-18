<script>
	import { Button, Card, CardBody, CardFooter, CardSubtitle, CardText, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, TabContent, Table, TabPane, Image, Icon } from "sveltestrap";
	import { assetDetail, selected_asset } from "../../../store/map.js";

	let openDetail = () => {
		// open = !open;
		window.open(`https://gis.pusair-pu.go.id/asset/detail/${$selected_asset.id}`, "_blank");
	};

	let closeDetail = () => {
		$selected_asset.id = undefined;
	};

	let open = false;
	const toggle = () => {
		open = !open;
	};


</script>

<div class="card" style="background-color: rgba(104,129,169,0.35)">
  <div class="card-header text-center bg-card-title text-light">Detail Information</div>
</div>
<Button class="btn-sm mt-2" color="danger" on:click={closeDetail}>Hide</Button>
<a href="" class="btn-sm mt-2" color="danger" on:click={closeDetail}>Hide</a>

<Table borderless size="sm" class="mt-4">
  <tbody>
  <tr>
    <td>Asset</td>
    <td>:</td>
    <td>{$selected_asset.name ?? '-'}</td>
  </tr>
  <tr>
    <td>Type</td>
    <td>:</td>
    <td>{$selected_asset.type ?? '-'}</td>
  </tr>
  <tr>
    <td>Pengelola</td>
    <td>:</td>
    <td>{$selected_asset.pengelola ?? '-'}</td>
  </tr>
  <tr>
    <td>WS</td>
    <td>:</td>
    <td>{$selected_asset.ws ?? '-'}</td>
  </tr>
  <tr>
    <td>DAS</td>
    <td>:</td>
    <td>{$selected_asset.das ?? '-'}</td>
  </tr>
  <tr>
    <td>Provinsi</td>
    <td>:</td>
    <td>{$selected_asset.provinsi ?? '-'}</td>
  </tr>
  <tr>
    <td>Kabupaten</td>
    <td>:</td>
    <td>{$selected_asset.kabupaten ?? '-'}</td>
  </tr>
  <tr>
    <td>Kecamatan</td>
    <td>:</td>
    <td>{$selected_asset.kecamatan ?? '-'}</td>
  </tr>
  <tr>
    <td>Desa</td>
    <td>:</td>
    <td>{$selected_asset.desa ?? '-'}</td>
  </tr>
  <tr>
    <td>Coordinate</td>
    <td>:</td>
    <td><span class="text-danger">{$selected_asset.coordinate}</span></td>
  </tr>
  </tbody>
</Table>

<Button class="btn-sm" color="primary" on:click={openDetail}>Detail</Button>

<div>
  <Modal isOpen={open} size="lg">
    <ModalHeader>{$selected_asset.name}</ModalHeader>
    <ModalBody>
      <TabContent vertical pills>
        <TabPane tabId="teknis" tab="Teknis">
          <h5 class="text-center mt-5 mb-5">Whoops!! Fitur belum tersedia</h5>
        </TabPane>
        <TabPane tabId="sub_asset" tab="Sub Asset">
          {#if $assetDetail.hasOwnProperty('sub_asset')}
            {#each $assetDetail.sub_asset as row}
              <Col xs="6" sm="4">
                <Card class="mt-3">
                  <CardBody>
                    <CardSubtitle>#{row.ref_id}</CardSubtitle>
                    <CardText>
                      {row.category.replace(/_/g, ' ')}
                      <em>{row.coordinate}</em>
                    </CardText>
                  </CardBody>
                  <CardFooter>{row.name}</CardFooter>
                </Card>
              </Col>
            {/each}
          {/if}
        </TabPane>

        <TabPane tabId="media" tab="Media" class="p-2" active>
          {#if $assetDetail.images.foto !== null}
            {#each $assetDetail.images.foto as img, i}
              <Image thumbnail alt="Image {++i}" src="{img}" style="width: 200px; height: 200px;" class="m-1" />
            {/each}
          {:else}
            <span>No Media</span>
          {/if}
          <!--          <Image thumbnail alt="Dunes" src="https://picsum.photos/200/200?random=1" />-->
          <!--          <Image thumbnail alt="Bicycle" src="https://picsum.photos/200/200?random=2" />-->
          <!--          <Image-->
          <!--            thumbnail-->
          <!--            alt="Television"-->
          <!--            src="https://picsum.photos/200/200?random=3"-->
          <!--          />-->
        </TabPane>

      </TabContent>
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" on:click={toggle}>Close</Button>
    </ModalFooter>
  </Modal>
</div>
